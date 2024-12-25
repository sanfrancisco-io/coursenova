import { Request, Response } from "express"
import { clerckClient } from "../index"

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params
  const userData = req.body

  try {
    const user = await clerckClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    })

    res.json({ message: "User updated successfuly", data: user })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving course", error })
  }
}
