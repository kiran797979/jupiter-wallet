'use server';

import {z} from 'zod';

const CreateProposalSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
});

export async function createProposal(prevState: any, formData: FormData) {
  const validatedFields = CreateProposalSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data. Please check the form.',
      success: false,
    };
  }

  // In a real app, you would save this to a database.
  // For the hackathon, we'll just simulate success.
  console.log('New Proposal Submitted:', validatedFields.data);

  return {
    message: `Proposal "${validatedFields.data.title}" submitted successfully!`,
    success: true,
    errors: {},
  };
}
