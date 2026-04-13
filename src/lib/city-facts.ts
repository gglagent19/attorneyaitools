import { getAllAttorneys } from "./vault";
import type { Attorney } from "./types";

export interface CityFacts {
  stateSlug: string;
  citySlug: string;
  attorneys: Attorney[];
  attorneyCount: number;
  topPracticeAreas: { name: string; count: number }[];
  avgRating: number;
  avgExperienceYears: number;
  topAttorneysByRating: Attorney[];
}

let factsCache: Map<string, CityFacts> | null = null;

function buildFactsIndex(): Map<string, CityFacts> {
  if (factsCache) return factsCache;
  const attorneys = getAllAttorneys();
  const groups = new Map<string, Attorney[]>();
  for (const a of attorneys) {
    if (!a.state_slug || !a.city_slug) continue;
    const key = `${a.state_slug}|${a.city_slug}`;
    const arr = groups.get(key);
    if (arr) arr.push(a);
    else groups.set(key, [a]);
  }

  const out = new Map<string, CityFacts>();
  for (const [key, list] of groups) {
    const [stateSlug, citySlug] = key.split("|");
    const paCounts = new Map<string, number>();
    let ratingSum = 0;
    let ratingN = 0;
    let yearsSum = 0;
    let yearsN = 0;
    for (const a of list) {
      if (Array.isArray(a.practice_areas)) {
        for (const pa of a.practice_areas) {
          paCounts.set(pa, (paCounts.get(pa) || 0) + 1);
        }
      }
      if (typeof a.rating === "number" && a.rating > 0) {
        ratingSum += a.rating;
        ratingN++;
      }
      if (typeof a.experience_years === "number" && a.experience_years > 0) {
        yearsSum += a.experience_years;
        yearsN++;
      }
    }
    const topPracticeAreas = [...paCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
    const topAttorneysByRating = [...list]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 12);

    out.set(key, {
      stateSlug,
      citySlug,
      attorneys: list,
      attorneyCount: list.length,
      topPracticeAreas,
      avgRating: ratingN > 0 ? ratingSum / ratingN : 0,
      avgExperienceYears: yearsN > 0 ? yearsSum / yearsN : 0,
      topAttorneysByRating,
    });
  }

  factsCache = out;
  return out;
}

export function getCityFacts(stateSlug: string, citySlug: string): CityFacts | undefined {
  return buildFactsIndex().get(`${stateSlug}|${citySlug}`);
}

// Cities considered "qualified for full editorial treatment" (have ≥3 attorneys
// and so render the rich attorney-driven template). Other cities still get a
// uniquely-data-rich page powered by Census facts.
export const MIN_ATTORNEYS_FOR_INDEX = 3;

export function isQualifiedCity(stateSlug: string, citySlug: string): boolean {
  const facts = getCityFacts(stateSlug, citySlug);
  return !!facts && facts.attorneyCount >= MIN_ATTORNEYS_FOR_INDEX;
}

export function getAllQualifiedCityKeys(): { state: string; city: string }[] {
  const out: { state: string; city: string }[] = [];
  for (const facts of buildFactsIndex().values()) {
    if (facts.attorneyCount >= MIN_ATTORNEYS_FOR_INDEX) {
      out.push({ state: facts.stateSlug, city: facts.citySlug });
    }
  }
  return out;
}

export interface StateFacts {
  stateSlug: string;
  attorneyCount: number;
  cityCount: number;
  qualifiedCityCount: number;
  topCities: { citySlug: string; cityName: string; count: number }[];
  topPracticeAreas: { name: string; count: number }[];
  avgRating: number;
  avgExperienceYears: number;
}

export function getStateFacts(stateSlug: string): StateFacts {
  const facts = buildFactsIndex();
  let attorneyCount = 0;
  let cityCount = 0;
  let qualifiedCityCount = 0;
  let ratingSum = 0;
  let ratingN = 0;
  let yearsSum = 0;
  let yearsN = 0;
  const paCounts = new Map<string, number>();
  const cityList: { citySlug: string; cityName: string; count: number }[] = [];

  for (const cf of facts.values()) {
    if (cf.stateSlug !== stateSlug) continue;
    cityCount++;
    if (cf.attorneyCount >= MIN_ATTORNEYS_FOR_INDEX) qualifiedCityCount++;
    attorneyCount += cf.attorneyCount;
    cityList.push({
      citySlug: cf.citySlug,
      cityName: cf.attorneys[0]?.city || cf.citySlug,
      count: cf.attorneyCount,
    });
    for (const a of cf.attorneys) {
      if (typeof a.rating === "number" && a.rating > 0) {
        ratingSum += a.rating;
        ratingN++;
      }
      if (typeof a.experience_years === "number" && a.experience_years > 0) {
        yearsSum += a.experience_years;
        yearsN++;
      }
      if (Array.isArray(a.practice_areas)) {
        for (const pa of a.practice_areas) {
          paCounts.set(pa, (paCounts.get(pa) || 0) + 1);
        }
      }
    }
  }

  return {
    stateSlug,
    attorneyCount,
    cityCount,
    qualifiedCityCount,
    topCities: cityList.sort((a, b) => b.count - a.count).slice(0, 24),
    topPracticeAreas: [...paCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count })),
    avgRating: ratingN > 0 ? ratingSum / ratingN : 0,
    avgExperienceYears: yearsN > 0 ? yearsSum / yearsN : 0,
  };
}

export interface PracticeAreaFacts {
  practiceSlug: string;
  attorneyCount: number;
  topStates: { stateSlug: string; stateName: string; count: number }[];
  topCities: { stateSlug: string; citySlug: string; cityName: string; stateName: string; count: number }[];
  avgRating: number;
  avgExperienceYears: number;
}

export function getPracticeAreaFacts(practiceSlug: string): PracticeAreaFacts {
  const facts = buildFactsIndex();
  let attorneyCount = 0;
  let ratingSum = 0;
  let ratingN = 0;
  let yearsSum = 0;
  let yearsN = 0;
  const stateCounts = new Map<string, { name: string; count: number }>();
  const cityCounts = new Map<
    string,
    { stateSlug: string; citySlug: string; cityName: string; stateName: string; count: number }
  >();

  for (const cf of facts.values()) {
    let cityHits = 0;
    for (const a of cf.attorneys) {
      const matches = (a.practice_areas || []).some(
        (p) => p.toLowerCase().replace(/[^a-z0-9]+/g, "-") === practiceSlug
      );
      if (!matches) continue;
      cityHits++;
      attorneyCount++;
      if (typeof a.rating === "number" && a.rating > 0) {
        ratingSum += a.rating;
        ratingN++;
      }
      if (typeof a.experience_years === "number" && a.experience_years > 0) {
        yearsSum += a.experience_years;
        yearsN++;
      }
      const sk = a.state_slug;
      const sn = a.state || sk;
      if (!stateCounts.has(sk)) stateCounts.set(sk, { name: sn, count: 0 });
      stateCounts.get(sk)!.count++;
    }
    if (cityHits > 0) {
      const key = `${cf.stateSlug}|${cf.citySlug}`;
      const cityName = cf.attorneys[0]?.city || cf.citySlug;
      const stateName = cf.attorneys[0]?.state || cf.stateSlug;
      cityCounts.set(key, {
        stateSlug: cf.stateSlug,
        citySlug: cf.citySlug,
        cityName,
        stateName,
        count: cityHits,
      });
    }
  }

  return {
    practiceSlug,
    attorneyCount,
    topStates: [...stateCounts.entries()]
      .map(([slug, v]) => ({ stateSlug: slug, stateName: v.name, count: v.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    topCities: [...cityCounts.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 12),
    avgRating: ratingN > 0 ? ratingSum / ratingN : 0,
    avgExperienceYears: yearsN > 0 ? yearsSum / yearsN : 0,
  };
}

// Stable hash → 0..n-1 for deterministic per-city variation in templates.
export function hashIndex(slug: string, mod: number): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % mod;
}
