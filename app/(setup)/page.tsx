import { redirect } from 'next/navigation'
import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db'
import { InitialModal } from '@/components/modals/initial-modal'

export const dynamic = 'force-dynamic'

const SetupPage = async () => {
	const profile = await initialProfile()

	// Проверяем, является ли profile объектом с полем id
	if ('id' in profile) {
		const server = await db.server.findFirst({
			where: {
				members: {
					some: {
						profileId: profile.id,
					},
				},
			},
		})

		if (server) {
			return redirect(`/server/${server.id}`)
		}
	} else {
		// Обработка случая, когда profile не является корректным объектом
		// Например, если это NextResponse, вы можете выполнить редирект
		return profile // Если это объект NextResponse
	}

	return <InitialModal />
}

export default SetupPage
