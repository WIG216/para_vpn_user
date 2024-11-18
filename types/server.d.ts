type SignalType = "high" | "low" | "medium";

interface RecentLocation {
  id: string;
  country: string;
  flag: string;
  signal: SignalType; 
}

type Server = {
  _id: string,
  name: string,
  image: string,
  createdAt?: Date,
  updatedAt?: Date,
  signal?: SignalType; 

}

type ApiResponse<T> = {
  message: string
}&({
  status: "Success",
  data: T
}| {
  status: "Failure"
})