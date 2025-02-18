import { redirect } from "next/navigation"

export default function StructureEstabDetailsPage({ params }: { params: { id: string } }) {
  redirect(`/organization/estab/${params.id}`)
}

