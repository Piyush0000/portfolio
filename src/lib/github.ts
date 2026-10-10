// Server-only GitHub data for the activity widget. Revalidated hourly.
// With GITHUB_TOKEN set, the heatmap uses the real contribution calendar
// (GraphQL). Without it, it is built from public events (last ~90 days),
// and the UI labels it that way.

export type Day = { date: string; count: number };

export type GitHubActivity = {
  user: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  days: Day[];
  total: number;
  source: "contributions" | "events";
  recentRepos: { name: string; url: string; description: string | null; language: string | null; stars: number; pushedAt: string }[];
};

const REVALIDATE = 3600;

async function gh<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-v3",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        ...init?.headers,
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function contributionCalendar(user: string): Promise<Day[] | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}`;
  type Resp = {
    data?: { user?: { contributionsCollection: { contributionCalendar: { weeks: { contributionDays: { date: string; contributionCount: number }[] }[] } } } };
  };
  const res = await gh<Resp>("/graphql", { method: "POST", body: JSON.stringify({ query, variables: { login: user } }) });
  const weeks = res?.data?.user?.contributionsCollection.contributionCalendar.weeks;
  if (!weeks) return null;
  return weeks.flatMap((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })));
}

async function eventDays(user: string): Promise<Day[]> {
  type Event = { type: string; created_at: string; payload?: { size?: number; commits?: unknown[] } };
  const pages = await Promise.all([1, 2, 3].map((p) => gh<Event[]>(`/users/${user}/events/public?per_page=100&page=${p}`)));
  const counts = new Map<string, number>();
  for (const e of pages.flat()) {
    if (!e) continue;
    const day = e.created_at.slice(0, 10);
    const weight = e.type === "PushEvent" ? Math.max(1, e.payload?.size ?? e.payload?.commits?.length ?? 1) : 1;
    counts.set(day, (counts.get(day) ?? 0) + weight);
  }
  // 13 full weeks ending today, aligned to Sunday like GitHub's calendar.
  const days: Day[] = [];
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - 7 * 13 + 1 - end.getUTCDay());
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: counts.get(key) ?? 0 });
  }
  return days;
}

export async function getGitHubActivity(user: string): Promise<GitHubActivity | null> {
  type User = { html_url: string; public_repos: number; followers: number };
  type Repo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; pushed_at: string; fork: boolean };

  const [profile, repos, calendar] = await Promise.all([
    gh<User>(`/users/${user}`),
    gh<Repo[]>(`/users/${user}/repos?sort=pushed&per_page=12`),
    contributionCalendar(user),
  ]);
  if (!profile) return null;

  const days = calendar ?? (await eventDays(user));
  return {
    user,
    profileUrl: profile.html_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    days,
    total: days.reduce((s, d) => s + d.count, 0),
    source: calendar ? "contributions" : "events",
    recentRepos: (repos ?? [])
      .filter((r) => !r.fork)
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
  };
}
