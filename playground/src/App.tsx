import {
	Button,
	Form,
	FormSubmitArgs,
	Heading,
	Input,
	Link,
	Modal,
	ModalDialog,
	ModalTrigger,
	SubmitButton,
	Textarea,
} from 'mado-ui'

export default function App() {
	const handleSubmit = ({ event, formContext }: FormSubmitArgs) => {
		const { currentTarget } = event

		console.log(formContext)

		currentTarget.reset()

		return { status: 'success' } as const
	}

	return (
		<main>
			<section className='px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-14 xl:py-28 2xl:px-16 2xl:py-32'>
				<div className='pb-8 sm:pb-16 md:pb-24 lg:pb-32'>
					<h1 className='from-ui-purple via-ui-magenta to-ui-red bg-linear-60 font-stretch-expanded bg-clip-text text-center text-2xl font-thin uppercase text-transparent brightness-125 sm:text-4xl md:text-5xl lg:text-6xl'>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet bg-linear-60 font-stretch-normal block whitespace-nowrap bg-clip-text pb-1 pt-4 text-8xl font-black [-webkit-text-stroke-color:var(--color-white)] [-webkit-text-stroke-width:1px] sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							<span className='from-ui-blue via-ui-blue to-ui-violet bg-linear-60 bg-clip-text'>
								窓
								<span
									aria-hidden='true'
									className='text-ui-grey absolute -top-1 left-1/2 block -translate-x-1/2 text-xs font-normal [-webkit-text-stroke-width:0] sm:top-0.5 sm:translate-y-1/2 md:top-3 lg:top-4'
								>
									mado
								</span>
							</span>{' '}
							UI
						</b>{' '}
						Playground
					</h1>

					<span
						aria-hidden='true'
						className='from-ui-purple via-ui-magenta to-ui-red bg-linear-60 font-stretch-expanded blur-xs absolute inset-0 -z-10 block select-none bg-clip-text text-center text-2xl font-thin uppercase text-transparent opacity-75 brightness-125 sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet bg-linear-60 font-stretch-normal block whitespace-nowrap bg-clip-text pb-1 pt-4 text-8xl font-black sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							窓 UI
						</b>{' '}
						Playground
					</span>

					<span
						aria-hidden='true'
						className='from-ui-purple via-ui-magenta to-ui-red bg-linear-60 font-stretch-expanded absolute inset-0 -z-10 block select-none bg-clip-text text-center text-2xl font-thin uppercase text-transparent opacity-50 blur-md brightness-110 sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet bg-linear-60 font-stretch-normal block whitespace-nowrap bg-clip-text pb-1 pt-4 text-8xl font-black sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							窓 UI
						</b>{' '}
						Playground
					</span>

					<span
						aria-hidden='true'
						className='from-ui-purple via-ui-magenta to-ui-red bg-linear-60 font-stretch-expanded absolute inset-0 -z-10 block select-none bg-clip-text text-center text-2xl font-thin uppercase text-transparent opacity-50 blur-2xl sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet bg-linear-60 font-stretch-normal block whitespace-nowrap bg-clip-text pb-1 pt-4 text-8xl font-black sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							窓 UI
						</b>{' '}
						Playground
					</span>
				</div>

				<p className='bg-linear-to-t font-oi text-shadow-sm sm:text-shadow-md md:text-shadow-lg dark:text-shadow-neutral-50/5 from-blue-300 via-blue-200 to-blue-50 bg-[size:100%_calc(1.5rem*1.625)] bg-clip-text bg-repeat-y text-center text-2xl leading-relaxed text-transparent [-webkit-text-stroke-color:var(--color-neutral-50)] [-webkit-text-stroke-width:.5px] sm:bg-[size:100%_calc(3rem*1.25)] sm:text-5xl sm:leading-tight md:bg-[size:100%_calc(3.75rem*1.25)] md:text-6xl lg:bg-[size:100%_calc(4.5rem*1.25)] lg:text-7xl dark:from-blue-600 dark:via-blue-500 dark:to-blue-200'>
					A{' '}
					<span className='saturate-125 inline-block bg-[url(/images/window.webp)] bg-[size:140%_auto] bg-clip-text bg-[position:50%_40%] bg-no-repeat brightness-125 contrast-125 dark:brightness-100'>
						window
					</span>{' '}
					of{' '}
					<span className='from-ui-sky-blue bg-linear-to-t inline-block to-white bg-clip-text brightness-125 dark:brightness-100'>
						clean,
					</span>{' '}
					<span className='bg-bottom-left inline-block bg-[url(/images/apple.webp)] bg-[size:350%_auto] bg-clip-text bg-no-repeat contrast-125 saturate-200'>
						easy
					</span>{' '}
					and{' '}
					<span className='saturate-125 inline-block w-fit bg-[url(/images/baloons.webp)] bg-cover bg-clip-text bg-[position:50%_25%] bg-no-repeat brightness-125 contrast-125 [-webkit-text-stroke-color:var(--color-orange-950)] dark:brightness-100'>
						fun-to-use
					</span>{' '}
					UI components for an{' '}
					<span className='saturate-125 inline-block bg-[url(/images/keyboard.webp)] bg-[size:150%_auto] bg-clip-text bg-center bg-no-repeat contrast-125'>
						accessible,
					</span>{' '}
					<span className='dark:brightness-80 inline-block w-fit bg-[url(/images/brain.webp)] bg-[size:150%_auto] bg-clip-text bg-[position:50%_60%] bg-no-repeat brightness-110 contrast-150 saturate-200'>
						no-thinking
					</span>{' '}
					user{' '}
					<span className='animate-bg-scroll animation-duration-10000 bg-linear-to-r inline-block bg-[size:75rem_100%] bg-clip-text bg-repeat-x brightness-125 saturate-150 [--tw-bg-scroll-end:-75rem] [--tw-gradient-stops:var(--tw-gradient-position),var(--color-ui-magenta),var(--color-ui-red),var(--color-ui-orange),var(--color-ui-yellow),var(--color-ui-green),var(--color-ui-sky-blue),var(--color-ui-blue),var(--color-ui-violet),var(--color-ui-purple),var(--color-ui-magenta)] dark:brightness-100'>
						experience.
					</span>
				</p>
			</section>

			<section className='from-ui-red via-ui-orange to-ui-yellow bg-linear-30 px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-14 xl:py-28 2xl:px-16 2xl:py-32 dark:from-red-950 dark:via-orange-800 dark:to-yellow-600'>
				<Heading className='text-shadow-lg pb-8 text-white'>Components</Heading>

				<ul className='grid gap-8 lg:grid-cols-2'>
					<li className='py-4.5 rounded-3xl px-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Heading
						</Heading>

						<p className='pb-8'>
							A heading component that renders HTML heading elements (h1-h6) with appropriate styling. Automatically
							generates an ID for the heading based on its content if none is provided.
						</p>

						<span className='block pb-2.5 text-6xl font-black last:pb-0'>Heading 1</span>

						<span className='block pb-2.5 text-5xl font-medium last:pb-0'>Heading 2</span>

						<span className='block pb-2 text-4xl font-extralight last:pb-0'>Heading 3</span>

						<Heading as='h4'>Heading 4</Heading>

						<Heading as='h5'>Heading 5</Heading>

						<Heading as='h6'>Heading 6</Heading>
					</li>

					<li className='py-4.5 rounded-3xl px-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Link
						</Heading>

						<p className='pb-8'>
							An animated link component with many variants for easy customization. It also has some sensible defaults
							depending on whether the link is external or internal, link only prefetching on internal links. When a
							link with a hash in the URL is clicked, the hash is automatically removed from the URL after scrolling.
						</p>

						<p>
							<Link href='#'>Normal</Link>{' '}
							<Link href='#' type='center'>
								Center
							</Link>{' '}
							<Link href='#' type='fill'>
								Fill
							</Link>{' '}
							<Link href='#' type='fill-ltr' theme='green'>
								Fill Left to Right
							</Link>{' '}
							<Link href='#' type='fill-rtl' theme='magenta'>
								Fill Right to Left
							</Link>{' '}
							<Link href='#' type='lift'>
								Lift
							</Link>{' '}
							<Link href='#' type='ltr'>
								Left to Right
							</Link>{' '}
							<Link href='#' type='multiline'>
								Multi-line
							</Link>{' '}
							<Link href='#' type='multiline-center'>
								Multi-line Center
							</Link>{' '}
							<Link href='#' type='multiline-fill' theme='orange'>
								Multi-line Fill
							</Link>{' '}
							<Link href='#' type='multiline-fill-center' theme='pink'>
								Multi-line Fill Center
							</Link>{' '}
							<Link href='#' type='multiline-fill-lift' theme='purple'>
								Multi-line Fill Lift
							</Link>{' '}
							<Link href='#' type='multiline-fill-ltr' theme='red'>
								Multi-line Fill Left to Right
							</Link>{' '}
							<Link href='#' type='multiline-fill-rtl' theme='violet'>
								Multi-line Fill Right to Left
							</Link>{' '}
							<Link href='#' type='multiline-lift'>
								Multi-line Lift
							</Link>{' '}
							<Link href='#' type='multiline-ltr'>
								Multi-line Left to Right
							</Link>{' '}
							<Link href='#' type='multiline-rtl'>
								Multi-line Right to Left
							</Link>{' '}
							<Link href='#' type='multiline-static'>
								Multi-line Static
							</Link>{' '}
							<Link href='#' type='rtl'>
								Right to Left
							</Link>{' '}
							<Link href='#' type='static'>
								Static
							</Link>
						</p>
					</li>

					<li className='py-4.5 rounded-3xl px-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Button
						</Heading>

						<p className='pb-8'>A pre-styled button with utility props for easy customization depending on use case.</p>

						<div className='flex flex-wrap items-center gap-4'>
							<Button>Standard</Button>

							<Button padding='sm' rounded='md' theme='magenta' className='text-sm'>
								Small Magenta
							</Button>

							<Button padding='xs' rounded='sm' theme='yellow' className='text-xs'>
								X-Small Yellow
							</Button>

							<Button padding='lg' rounded='none' theme='red-gradient' className='text-lg'>
								Large Sharp Red Gradient
							</Button>

							<Button padding='xl' rounded='full' theme='violet-gradient' className='text-xl'>
								X-Large Violet Gradient Pill
							</Button>
						</div>
					</li>

					<li className='py-4.5 rounded-3xl px-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Modal
						</Heading>

						<p className='pb-8'>
							A uniquely interactive modal that allows for simplicity in closing the modal by swiping down, pressing the
							x-mark, pressing outside of the modal, pressing the escape key, or your own built-in method. Built for
							both mobile and desktop.
						</p>

						<Modal>
							{({ closeModal }: { closeModal: () => void }) => (
								<>
									<ModalTrigger as={Button} theme='green'>
										Open the Modal
									</ModalTrigger>

									<ModalDialog>
										<Heading as='h4'>Welcome to the Modal</Heading>

										<p className='pb-2'>Close the modal however you would like:</p>

										<ul className='list-inside list-disc pb-4 leading-normal'>
											<li>
												<p>Swipe down from the top bar.</p>
											</li>

											<li>
												<p>Press the x-mark in the top right of the screen.</p>
											</li>

											<li>
												<p>Press the blurry space outside of the modal.</p>
											</li>

											<li>
												<p>Press your escape key.</p>
											</li>

											<li>
												<p>Press the close button below.</p>
											</li>
										</ul>

										<Button onClick={closeModal} theme='magenta'>
											All Done ✓
										</Button>
									</ModalDialog>
								</>
							)}
						</Modal>
					</li>

					<li className='py-4.5 rounded-3xl px-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Form
						</Heading>

						<p className='pb-8'>
							A fully controlled form that manages its own state and provides a simple API for validation and
							submission.
						</p>

						<Form onSubmit={handleSubmit}>
							<Input name='First Name' label='*' description='Enter your first name' placeholder='*' />

							<Input name='Last Name' label='*' description='Enter your last name' placeholder='*' />

							<Input
								name='Email Address'
								type='email'
								label='*'
								description='Enter your email address'
								placeholder='*'
							/>

							<Input name='Phone Number' type='tel' label='*' description='Enter your phone number' placeholder='*' />

							<Textarea
								name='Message'
								label='*'
								description='Enter a message, if you would like'
								placeholder='Message…'
							/>

							<SubmitButton theme='blue'>Submit</SubmitButton>
						</Form>
					</li>
				</ul>
			</section>
		</main>
	)
}
