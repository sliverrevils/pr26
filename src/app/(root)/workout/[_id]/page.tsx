import Shots from "@/components/content/Shots/Shots";
import WorkoutLayout from "@/layouts/WorkoutLayout/WorkoutLayout";
import { getDrillById } from "@/services/drillsService";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ _id: string }> };
export default async function WorkoutPage({ params }: Props) {
    const { _id } = await params;

    const drill = await getDrillById({ _id });

    if (!drill) notFound();

    return (
        <WorkoutLayout drill={drill} className="flex flex-col lg:flex-row">
            <Shots video={drill._id} view="workout" />
        </WorkoutLayout>
    );
}
