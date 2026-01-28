export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			{/* header */}
			<div>{children}</div>
		</>
	)
}
