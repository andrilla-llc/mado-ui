import {
	Button,
	Details,
	DetailsBody,
	DetailsSummary,
	DropDown,
	DropDownButton,
	DropDownItem,
	DropDownItems,
	DropDownSection,
	DropDownSeparator,
	Fieldset,
	Form,
	FormSubmitArgs,
	Heading,
	IFrame,
	Input,
	Link,
	Modal,
	ModalDialog,
	ModalTrigger,
	SubmitButton,
	Textarea,
	Tooltip,
	TooltipPanel,
	TooltipTrigger,
	Video,
} from 'mado-ui/components'

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export default function App() {
	const handleSubmit = async ({ formContext }: FormSubmitArgs) => {
		console.log(formContext)

		await delay(5000)

		return { status: 'success' } as const
	}

	return (
		<main>
			<section className='px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-14 xl:py-28 2xl:px-16 2xl:py-32'>
				<div className='pb-8 sm:pb-16 md:pb-24 lg:pb-32'>
					<h1 className='from-ui-purple via-ui-magenta to-ui-red bg-linear-60 bg-clip-text text-center text-2xl font-thin text-transparent uppercase font-stretch-expanded brightness-125 sm:text-4xl md:text-5xl lg:text-6xl'>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet block bg-linear-60 bg-clip-text pt-4 pb-1 text-8xl font-black whitespace-nowrap font-stretch-normal [-webkit-text-stroke-color:var(--color-white)] [-webkit-text-stroke-width:1px] sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
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
						className='from-ui-purple via-ui-magenta to-ui-red absolute inset-0 -z-10 block bg-linear-60 bg-clip-text text-center text-2xl font-thin text-transparent uppercase font-stretch-expanded opacity-75 blur-xs brightness-125 select-none sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet block bg-linear-60 bg-clip-text pt-4 pb-1 text-8xl font-black whitespace-nowrap font-stretch-normal sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							窓 UI
						</b>{' '}
						Playground
					</span>

					<span
						aria-hidden='true'
						className='from-ui-purple via-ui-magenta to-ui-red absolute inset-0 -z-10 block bg-linear-60 bg-clip-text text-center text-2xl font-thin text-transparent uppercase font-stretch-expanded opacity-50 blur-md brightness-110 select-none sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet block bg-linear-60 bg-clip-text pt-4 pb-1 text-8xl font-black whitespace-nowrap font-stretch-normal sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							窓 UI
						</b>{' '}
						Playground
					</span>

					<span
						aria-hidden='true'
						className='from-ui-purple via-ui-magenta to-ui-red absolute inset-0 -z-10 block bg-linear-60 bg-clip-text text-center text-2xl font-thin text-transparent uppercase font-stretch-expanded opacity-50 blur-2xl select-none sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Welcome to the{' '}
						<b className='from-ui-green via-ui-blue to-ui-violet block bg-linear-60 bg-clip-text pt-4 pb-1 text-8xl font-black whitespace-nowrap font-stretch-normal sm:text-[12rem] md:text-[16rem] lg:text-[18rem]'>
							窓 UI
						</b>{' '}
						Playground
					</span>
				</div>

				<p className='bg-linear-to-t from-blue-300 via-blue-200 to-blue-50 bg-[size:100%_calc(1.5rem*1.625)] bg-clip-text bg-repeat-y text-center font-oi text-2xl leading-relaxed text-transparent [-webkit-text-stroke-color:var(--color-neutral-50)] [-webkit-text-stroke-width:.5px] text-shadow-sm sm:bg-[size:100%_calc(3rem*1.25)] sm:text-5xl sm:leading-tight sm:text-shadow-md md:bg-[size:100%_calc(3.75rem*1.25)] md:text-6xl md:text-shadow-lg lg:bg-[size:100%_calc(4.5rem*1.25)] lg:text-7xl dark:from-blue-600 dark:via-blue-500 dark:to-blue-200 dark:text-shadow-neutral-50/5'>
					A{' '}
					<span className='inline-block bg-[url(/images/window.webp)] bg-[size:140%_auto] bg-clip-text bg-[position:50%_40%] bg-no-repeat brightness-125 contrast-125 saturate-125 dark:brightness-100'>
						window
					</span>{' '}
					of{' '}
					<span className='from-ui-sky-blue inline-block bg-linear-to-t to-white bg-clip-text brightness-125 dark:brightness-100'>
						clean,
					</span>{' '}
					<span className='inline-block bg-[url(/images/apple.webp)] bg-[size:350%_auto] bg-clip-text bg-bottom-left bg-no-repeat contrast-125 saturate-200'>
						easy
					</span>{' '}
					and{' '}
					<span className='inline-block w-fit bg-[url(/images/baloons.webp)] bg-cover bg-clip-text bg-[position:50%_25%] bg-no-repeat brightness-125 contrast-125 saturate-125 [-webkit-text-stroke-color:var(--color-orange-950)] dark:brightness-100'>
						fun-to-use
					</span>{' '}
					UI components for an{' '}
					<span className='inline-block bg-[url(/images/keyboard.webp)] bg-[size:150%_auto] bg-clip-text bg-center bg-no-repeat contrast-125 saturate-125'>
						accessible,
					</span>{' '}
					<span className='inline-block w-fit bg-[url(/images/brain.webp)] bg-[size:150%_auto] bg-clip-text bg-[position:50%_60%] bg-no-repeat brightness-110 contrast-150 saturate-200 dark:brightness-80'>
						no-thinking
					</span>{' '}
					user{' '}
					<span className='animate-bg-scroll animation-duration-10000 inline-block bg-linear-to-r [--tw-gradient-stops:var(--tw-gradient-position),var(--color-ui-magenta),var(--color-ui-red),var(--color-ui-orange),var(--color-ui-yellow),var(--color-ui-green),var(--color-ui-sky-blue),var(--color-ui-blue),var(--color-ui-violet),var(--color-ui-purple),var(--color-ui-magenta)] bg-[size:75rem_100%] bg-clip-text bg-repeat-x brightness-125 saturate-150 [--tw-bg-scroll-end:-75rem] dark:brightness-100'>
						experience.
					</span>
				</p>
			</section>

			<section className='from-ui-red via-ui-orange to-ui-yellow bg-linear-30 px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-14 xl:py-28 2xl:px-16 2xl:py-32 dark:from-red-950 dark:via-orange-800 dark:to-yellow-600'>
				<Heading className='pb-8 text-white text-shadow-lg'>Components</Heading>

				<ul className='grid grid-rows-[masonry] gap-8 lg:grid-cols-2'>
					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
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

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
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
							<Link
								href='#'
								type='multiline-fill-center'
								theme='custom'
								customTheme={{ themeColor: '[--theme-color:var(--color-cyan-500)]' }}
							>
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

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
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

							<Button gradient padding='lg' rounded='none' theme='red' className='text-lg'>
								Large Sharp Red Gradient
							</Button>

							<Button gradient padding='xl' rounded='full' theme='violet' className='text-xl'>
								X-Large Violet Gradient Pill
							</Button>

							<Button customTheme={{ themeColor: '[--theme-color:var(--color-cyan-500)]' }} theme='custom'>
								Custom Cyan Theme Color
							</Button>

							<Button
								className='text-shadow-[0_-1px_0] text-shadow-cyan-950'
								customTheme={{ themeColor: '[--theme-color:var(--color-cyan-500)]' }}
								gradient
								theme='custom'
							>
								Custom Cyan Theme Color with Gradient
							</Button>
						</div>
					</li>

					<li className='rounded-3xl px-6 pt-4.5 pb-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							IFrame
						</Heading>

						<p className='pb-8'>A pre-styled button with utility props for easy customization depending on use case.</p>

						<IFrame
							src='https://player.vimeo.com/video/988865902?h=ea416448ea&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
							title='American Cityscapes'
							allow={['fullscreen', 'picture-in-picture']}
							className='rounded-xl'
						/>
					</li>

					<li className='rounded-3xl px-6 pt-4.5 pb-6 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Video
						</Heading>

						<p className='pb-8'>
							A fully-fledged video-player? Wow! Sure, it's not as secure or simple as Vimeo, and doesn't have as many
							features as YouTube, but if you need a simple, free, customizable video-player, here it is.
						</p>

						<Video
							title='American Cityscapes'
							className='rounded-xl'
							loop
							poster={[
								{
									src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/american-cityscapes-1080p.webp',
									type: 'image/webp',
									width: 1080,
									primary: true,
								},
							]}
							srcSet={[
								{
									srcGroup: [
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-240p.webm',
											type: 'video/webm',
										},
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/mp4/american-cityscapes-240p.mp4',
											type: 'video/mp4',
										},
									],
									width: 240,
								},
								{
									srcGroup: [
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-360p.webm',
											type: 'video/webm',
										},
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/mp4/american-cityscapes-360p.mp4',
											type: 'video/mp4',
										},
									],
									width: 360,
								},
								{
									srcGroup: [
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-540p.webm',
											type: 'video/webm',
										},
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/mp4/american-cityscapes-540p.mp4',
											type: 'video/mp4',
										},
									],
									width: 540,
								},
								{
									srcGroup: [
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-720p.webm',
											type: 'video/webm',
										},
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/mp4/american-cityscapes-720p.mp4',
											type: 'video/mp4',
										},
									],
									width: 720,
								},
								{
									srcGroup: [
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-1080p.webm',
											type: 'video/webm',
										},
										{
											src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/mp4/american-cityscapes-1080p.mp4',
											type: 'video/mp4',
										},
									],
									width: 1080,
								},
								{
									src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-1440p.webm',
									type: 'video/webm',
									width: 1440,
								},
								{
									src: 'https://dcwujwzbdeazxiwcantj.supabase.co/storage/v1/object/public/videos/american-cityscapes/webm/american-cityscapes-2160p.webm',
									type: 'video/webm',
									width: 2160,
								},
							]}
						/>
					</li>

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
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

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Tooltip
						</Heading>

						<p className='pb-8'>
							A straight-forward component for displaying additional information when the user hovers over the trigger
							on desktop or taps on the trigger on touch devices. It always stays on screen, relative to the trigger,
							and you can set an anchor point to control its position.
						</p>

						<div className='flex flex-wrap items-center gap-4'>
							<Tooltip arrow>
								<TooltipTrigger as={Button} gradient theme='blue'>
									<span className='hidden pointer-fine:inline'>Hover </span>
									<span className='hidden pointer-coarse:inline'>Tap </span>to Open the Tooltip
								</TooltipTrigger>

								<TooltipPanel>
									Example of a super long tooltip, with so much detail, it's guaranteed to go off the screen on smaller
									displays, like a mobile device, and maybe a tablet, if that tablet is on the smaller end, or at least
									in a vertical orientation.
								</TooltipPanel>
							</Tooltip>

							<Tooltip anchor='right' arrow>
								<TooltipTrigger as={Button} gradient theme='green'>
									This One Goes Out Right
								</TooltipTrigger>

								<TooltipPanel>
									Since this tooltip is so long and it's anchored to the right of the trigger, it will overflow to the
									right. On a screen large enough, it will appear under the element to the right of this tooltip's
									container. One option to fix this would be adding a z-index to the container, making it appear above
									its siblings. However, often the best choice is using a React Portal. Thankfully, this feature is
									built into the tooltip component. See the next example to see it in use.
								</TooltipPanel>
							</Tooltip>

							<Tooltip anchor='right-end' arrow portal>
								<TooltipTrigger as={Button} gradient theme='red'>
									This One Uses a Portal
								</TooltipTrigger>

								<TooltipPanel>
									Just like the previous example, this tooltip is anchored to the right of the trigger element. However,
									since it's rendered in a portal, it will always appear above all other elements on the page. There are
									some drawbacks to using portals, so it's not the default. The main issue is with how the position
									translates from the top left of the body to its correct position.
								</TooltipPanel>
							</Tooltip>

							<Tooltip anchor='bottom-end' arrow>
								<TooltipTrigger as={Button} gradient theme='brown'>
									Bottom End
								</TooltipTrigger>

								<TooltipPanel>
									I should be below the trigger, and aligned with the right side. Look at how it beautifully stays on
									screen anyway.
								</TooltipPanel>
							</Tooltip>

							<Tooltip anchor='left-end' arrow>
								<TooltipTrigger as={Button} gradient theme='sky-blue'>
									Left End
								</TooltipTrigger>

								<TooltipPanel>
									I can only be on the left side if there's room for me. I'll be on the right side if there's not enough
									room.
								</TooltipPanel>
							</Tooltip>
						</div>
					</li>

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Form <small>and Inputs</small>
						</Heading>

						<p className='pb-8'>
							A fully controlled form that manages its own state and provides a simple API for validation and
							submission. Use the various input components for an easy, robust implementation.
						</p>

						<Form onSubmit={handleSubmit}>
							<Fieldset legend='Full Name' join=' '>
								<div className='grid grid-cols-2 gap-(--tw-gap)'>
									<Input name='First Name' label='*' description='Enter your first name' placeholder='*' />

									<Input name='Last Name' label='*' description='Enter your last name' placeholder='*' />
								</div>
							</Fieldset>

							<Fieldset legend='Contact Info'>
								<div className='grid grid-cols-2 gap-(--tw-gap)'>
									<Input
										name='Email Address'
										type='email'
										label='*'
										description='Enter your email address'
										placeholder='*'
									/>

									<Input
										name='Phone Number'
										type='tel'
										label='*'
										description='Enter your phone number'
										placeholder='*'
									/>
								</div>
							</Fieldset>

							<Textarea
								name='Message'
								label='*'
								description='Enter a message, if you would like'
								placeholder='Message…'
							/>

							<Fieldset legend='Password'>
								<div className='grid grid-cols-2 gap-(--tw-gap)'>
									<Input
										name='Password'
										type='password'
										label='*'
										description='Enter a password'
										minLength={8}
										options={{
											requireLowercaseCharacter: true,
											requireNumber: true,
											requireSpecialCharacter: true,
											requireUppercaseCharacter: true,
										}}
									/>

									<Input
										name='Confirm Password'
										type='password'
										label='*'
										description='Enter your password again'
										options={{
											matchPreviousInput: true,
										}}
									/>
								</div>
							</Fieldset>

							<Fieldset legend='Misc Input Types' decorative>
								<div className='grid grid-cols-2 gap-(--tw-gap)'>
									<Input
										name='Date'
										type='date'
										label='*'
										min={[2000, 'August', 24]}
										max={{ day: 24, month: 8, year: 2025 }}
									/>
								</div>
							</Fieldset>

							<SubmitButton>Submit</SubmitButton>
						</Form>
					</li>

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Details
						</Heading>

						<p className='pb-8'>
							Components for <code>{`<details>`}</code> and <code>{`<summary>`}</code> with smooth animations.
						</p>

						<Details>
							<DetailsSummary>The Frames for the Glass</DetailsSummary>

							<DetailsBody>
								<p>
									<span className='block'>The frames for the glass</span>

									<span className='block'>A sturdy structure</span>

									<span className='block'>For light now to pass</span>

									<span className='block'>Without any fracture</span>
								</p>

								<p>
									<span className='block'>The glass for the frames</span>

									<span className='block'>Sits there so pretty</span>

									<span className='block'>No light does it claim</span>

									<span className='block'>(Not sure)</span>
								</p>
							</DetailsBody>
						</Details>
					</li>

					<li className='rounded-3xl px-6 py-4.5 text-white shadow-2xl backdrop-blur-3xl backdrop-brightness-110'>
						<Heading as='h3' className='pb-4'>
							Drop Down Menu
						</Heading>

						<p className='pb-8'>Drop down components.</p>

						<DropDown>
							<DropDownButton as={Button}>Drop the Down</DropDownButton>

							<DropDownItems>
								<DropDownSection label='Section 1'>
									<DropDownItem>Item 1</DropDownItem>

									<DropDownItem>Item 2</DropDownItem>

									<DropDownItem>Item 3</DropDownItem>
								</DropDownSection>

								<DropDownSeparator />

								<DropDownSection label='Section 2' separatorBelow>
									<DropDownItem>Item 1</DropDownItem>

									<DropDownItem>Item 2</DropDownItem>

									<DropDownItem>Item 3</DropDownItem>
								</DropDownSection>

								<DropDownSection label='Section 3'>
									<DropDownItem>Item 1</DropDownItem>

									<DropDownItem>Item 2</DropDownItem>

									<DropDownItem>Item 3</DropDownItem>
								</DropDownSection>
							</DropDownItems>
						</DropDown>
					</li>
				</ul>
			</section>
		</main>
	)
}
