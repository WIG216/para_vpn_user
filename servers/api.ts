import axiosInstance from "@/config/axiosInstance"

export const getServers = async (): Promise<{ allServers: Server[], lastTwoServers: Server[] }> => {
    try {
        const response = await axiosInstance({
            url: "/servers",
        })

        const allServers = response.data;
        const lastTwoServers = allServers.slice(-2); // Get the last two servers
    
        return {
          allServers, 
          lastTwoServers, 
          }
    } catch (error: any) {
        throw new Error(error.message)
    }

}