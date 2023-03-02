import { useEffect, useState } from 'react'
const localCache = {}
const useBreedList = (animal) => {
    const [breedList, setbreedList] = useState([])
    const [status, setStatus] = useState("unloaded")
    useEffect(() => {
        if (!animal) {
            setbreedList([])
        } else if (localCache[animal]) {
            setbreedList(localCache[animal])
        } else {
            requestBreedList()
        }
        async function requestBreedList() {
            setbreedList([]);
            setStatus('loading');
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
            const json = await res.json();
            localCache[animal] = json.breeds || [];
            setbreedList(localCache[animal]);
            setStatus('loaded');
        }
    }, [animal])

    return [breedList, status]
}

export default useBreedList