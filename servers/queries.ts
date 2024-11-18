import { useQuery } from "@tanstack/react-query"
import {  getServers } from "./api"

export function useServers() {
    return useQuery({
        queryKey: ['servers'],
        queryFn: getServers,
        refetchOnWindowFocus: false
    })
}
