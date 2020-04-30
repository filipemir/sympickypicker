const DIAGNOSES_ENDPOINT = '/api/diagnoses/';

async function getDiagnosesHttp({ symptom, url }) {
    !url && (url = DIAGNOSES_ENDPOINT + "/?symptom=" + symptom.id);

    const res = await fetch(url, {
        method: "GET",
        headers: new Headers({'Accept': 'application/json'})
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch diagnoses`);
    }

    return await res.json();
}

const cache = {};
export async function getDiagnoses({ symptom }) {
    if (!cache[symptom.id]) {
        const { count, results, next } = await getDiagnosesHttp({ symptom })
        cache[symptom.id] = {
            cursor: 0,
            count, 
            results,
            next
        };
    }

    const { next, results, cursor } = cache[symptom.id],
        needsNext = cursor >= results.length - 1;

    if (needsNext && next) {
        const newResponse = await getDiagnosesHttp({ symptom, url: next }),
            existingEntry = cache[symptom.id];
        
        existingEntry.results.push(...newResponse.results);

        cache[symptom.id] = {
            ...existingEntry,
            next: newResponse.next,
            count: newResponse.count
        }
    }

    return cache[symptom.id];
}

async function getNextDiagnostic({ symptom }) {
    const { cursor, results } = await getDiagnoses({ symptom }),
        nextDiagnostic = cursor >= results.length ? undefined : results[cursor];

    if (nextDiagnostic) {
        cache[symptom.id].cursor += 1;
    }

    return nextDiagnostic;
}

export async function getDiagnostic({ symptom }) {
    return getNextDiagnostic({ symptom });
}


export async function incrementDiagnostic({ symptom, condition }) {
    const res = await fetch(DIAGNOSES_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ symptom: symptom.id, condition: condition.id }),
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) 
    });

    if (!res.ok) {
        throw new Error(`Failed to increment diagnostic`);
    }
}