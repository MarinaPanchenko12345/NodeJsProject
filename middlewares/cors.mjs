import cors from "cors";

 //Middleware for CORS.
 // It specifies the allowed HTTP methods and headers for cross-origin requests.
export const corsMiddleware = cors({
  origin: true,
  credentials: true,
  methods: "GET,PUT,POST,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Accept, Authorization",
});
