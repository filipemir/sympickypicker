const SYMPTOMS_ENDPOINT = '/api/symptoms/';

export async function getSymptoms({ page = 1 } = {}) {
    const res = await fetch(SYMPTOMS_ENDPOINT + "/?page=" + page, {
        method: "GET",
        headers: new Headers({'Accept': 'application/json'})
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch symptoms`);
    }

    return await res.json();
}