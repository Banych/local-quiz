'use client';

import React from 'react';
import { CircleX } from 'lucide-react';
import {
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import playerConfigureFormSchema, {
  PlayerConfigureFormType,
} from '@/components/players/player-configure-form.schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { PlayerFormType } from '@/types/player.type';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type PlayerConfigureFormProps = {
  onSubmit: (data: PlayerConfigureFormType) => void;
  formDescription?: React.ReactNode;
  defaultValues?: PlayerConfigureFormType;
};

const PlayerConfigureForm: React.FC<PlayerConfigureFormProps> = ({
  onSubmit,
  formDescription,
  defaultValues = { name: '', avatar_url: '', status_message: '' },
}) => {
  const form = useForm<PlayerConfigureFormType>({
    resolver: zodResolver(playerConfigureFormSchema),
    mode: 'onBlur', // Ensure validation on blur
    defaultValues,
  });

  const {
    field: { onChange: onAvatarUrlChange, ...avatarUrlField },
  } = useController({
    name: 'avatar_url',
    control: form.control,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onAvatarUrlChange(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit: SubmitHandler<PlayerFormType> = (data) => {
    onSubmit(data);
  };

  const handleResetForm = () => {
    form.reset();
  };

  return (
    <Card className="flex w-full flex-col p-4 md:w-3/4 lg:w-1/2">
      <CardHeader>
        <CardDescription>
          {formDescription ?? 'Configure your player profile'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    value={field.value ?? ''}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="status_message">Status Message</Label>
            <Controller
              control={form.control}
              name="status_message"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    id="status_message"
                    type="text"
                    value={field.value ?? ''}
                  />
                  {form.formState.errors.status_message && (
                    <p className="text-red-600">
                      {form.formState.errors.status_message.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            {avatarUrlField.value ? (
              <div className="relative">
                <Avatar className=" size-32 md:size-52">
                  <AvatarImage src={avatarUrlField.value} alt="Player Avatar" />
                </Avatar>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="absolute right-0 top-0 text-red-600"
                      variant="link"
                      size="icon"
                      onClick={() => onAvatarUrlChange('')}
                    >
                      <CircleX size={28} strokeWidth={3} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove Avatar</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <>
                <Label htmlFor="avatar_url" className="self-start">
                  Avatar
                </Label>

                <Input
                  id="avatar_url"
                  type="file"
                  className="w-full"
                  onChange={handleAvatarChange}
                />
                {form.formState.errors.avatar_url && (
                  <p className="text-red-600">
                    {form.formState.errors.avatar_url.message}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={handleResetForm}>
              Reset
            </Button>

            <Button type="submit" disabled={!form.formState.isValid}>
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlayerConfigureForm;
