import { PlayerFormType } from '@/types/player.type';
import { z } from 'zod';

const playerConfigureFormSchema: z.ZodType<PlayerFormType> = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  avatar_url: z.string().nullable().optional(),
  status_message: z.string().nullable().optional(),
});

export type PlayerConfigureFormType = z.infer<typeof playerConfigureFormSchema>;

export default playerConfigureFormSchema;
