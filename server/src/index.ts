import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import * as dynamoose from "dynamoose"
// Route imports
import courseRoutes from "./routes/courseRoutes"
import userClerkRoutes from "./routes/userClerkRoutes"
import transactionRoutes from "./routes/transactionRoutes"
import userCourseProgressRoutes from "./routes/userCourseProgress"
import { clerkMiddleware, createClerkClient, requireAuth } from "@clerk/express"

// Configs
dotenv.config()

const isProduction = process.env.NODE_ENV === "production"
const dynamodbport = process.env.DYNAMODB

if (!isProduction) {
  dynamoose.aws.ddb.local(dynamodbport)
}

export const clerckClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  // publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
})

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(clerkMiddleware())

// routes
app.get("/", (req, res) => {
  res.send("hello world!")
})

app.use("/courses", courseRoutes)
app.use("/users/clerk", requireAuth(), userClerkRoutes)
app.use("/transactions", requireAuth(), transactionRoutes)
app.use("/users/course-progress", requireAuth(), userCourseProgressRoutes)

// server
const port = process.env.PORT || 3000
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}
