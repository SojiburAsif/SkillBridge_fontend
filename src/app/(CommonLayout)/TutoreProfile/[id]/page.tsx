import { TutorService } from "@/services/TutorProfile.service";




export default async function TutorProfile({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const { data } = await TutorService.getTutorById(id);
    console.log("data:::::",data);

    return (
        <div className='mt-23'>Thi is {id}
            <h1>{data?.bio}</h1>
            <div className="">helloo {}</div>
        </div>
    )
}
