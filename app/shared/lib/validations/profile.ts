import z from "zod"

export const updateProfileSchema = z.object({
	name: z.string().min(2, 'Введите минимум 2 символа'),
})

export type UpdateProfileData = z.infer<typeof updateProfileSchema>