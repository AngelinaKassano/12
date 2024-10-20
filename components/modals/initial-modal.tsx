'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Введите название сервера', // Changed the message for clarity
	}),
})

export const InitialModal = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			imageUrl: '',
		},
	});

	const isLoading = form.formState.isSubmitting
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// Fixed typo 'asyns' to 'async'
		console.log(values)
	}

	return (
		<Dialog open>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Создание сервера
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Создайте свой сервер, введите его название и картинку.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-8 px-6'>
							<div className='flex items-center justify-center text-center'>
								Загрузить изображение
							</div>
							<FormField
								control={form.control}
								name='name'
								render={(
									{ field } // Fixed 'fiekd' to 'field'
								) => (
									<FormItem>
										<FormLabel>Название сервера</FormLabel>{' '}
										{/* Added label for clarity */}
										<FormControl>
											<Input placeholder='Введите название' {...field} />{' '}
											{/* Added input */}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' disabled={isLoading}>
							{isLoading ? 'Создание...' : 'Создать сервер'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
