
export default interface ApiResponse<T> {
    status: string;
    statusCode: number;
    data: T;
  }
  