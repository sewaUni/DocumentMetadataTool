import {DashboardGraph} from "@/components/dashboard/DashboardGraph";


export default function DashboardPage () {
    return (
        <>
            <h1 className={"font-bold text-4xl"}>Dashboard</h1>
            <p>Number of Papers submitted</p>
            <DashboardGraph/>
        </>

    )
}