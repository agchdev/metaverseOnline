import { useAtom } from "jotai"
import { mapAtom } from "../components/SocketManager"

import * as THREE from "three"

export const useGrid = () => {
    const [map] = useAtom(mapAtom);

    const vector3ToGrid = (vector3) => {
        return [
            Math.floor(vector3.x / map.gridDivision),
            Math.floor(vector3.z / map.gridDivision)
        ]
    }

    const gridToGrid3 = (gridPosition, witdh = 1, height = 1) => {
        return new THREE.vector3(
            witdh / map.gridDivision / 2 + gridPosition[0] * map.gridDivision,
            0,
            height / map.gridDivision / 2 + gridPosition[1] * map.gridDivision
        )
    }

    return {
        vector3ToGrid,
        gridToGrid3
    }
}