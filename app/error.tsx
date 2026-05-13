'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Логируем ошибку для отладки
		console.error('Error Boundary:', error)
	}, [error])

	return (
		<div className='min-h-screen bg-background flex items-center justify-center p-4'>
			<Card className='w-full max-w-md p-8 text-center shadow-lg'>
				{/* Иконка ошибки */}
				<div className='mx-auto mb-6 w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center'>
					<svg
						className='w-8 h-8 text-destructive'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
						/>
					</svg>
				</div>

				{/* Заголовок */}
				<h1 className='text-2xl font-bold text-foreground mb-2 heading'>
					Упс! Что-то пошло не так
				</h1>

				{/* Описание */}
				<p className='text-muted-foreground mb-6 leading-relaxed'>
					Произошла неожиданная ошибка. Наши специалисты уже работают над её
					исправлением.
				</p>

				{/* Действия */}
				<div className='space-y-3'>
					<Button onClick={() => reset()} className='w-full' size='lg'>
						<svg
							className='w-4 h-4 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
							/>
						</svg>
						Попробовать снова
					</Button>

					<Button
						variant='outline'
						onClick={() => (window.location.href = '/')}
						className='w-full'
						size='lg'
					>
						<svg
							className='w-4 h-4 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
							/>
						</svg>
						Вернуться на главную
					</Button>
				</div>
			</Card>
		</div>
	)
}
