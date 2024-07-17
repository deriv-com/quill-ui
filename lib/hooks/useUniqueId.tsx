import { useMemo, useState } from "react";

const uniqueIdMap: Record<string, number> = {};

export const useUniqueId = (prefixId: string) => {
    const [customId, setCustomId] = useState(0);
    useMemo(() => {
        const id = uniqueIdMap[prefixId] || 0;
        uniqueIdMap[prefixId] = id + 1;

        setCustomId(uniqueIdMap[prefixId]);
    }, []);

    return `${prefixId}-${customId}`;
};

export default useUniqueId;
