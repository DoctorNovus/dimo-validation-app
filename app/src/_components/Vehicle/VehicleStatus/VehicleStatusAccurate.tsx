export default function VehicleStatusAccurate({ name, value, status }: { name: string, value: string, status: string }) {
    return (
        <div className="flex flex-col justify-start gap-2">
            <label htmlFor={`${name}_${status}`} className="text-sm text-gray-500/70">{name}</label>
            <input className="text-black dark:text-white" name={`${name}_${status}`} value={value} onChange={() => { }} />
        </div>
    )
}