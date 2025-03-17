export default function VehicleStatusAccurate({ signal, name, value, status, unit }: { signal: string, name: string, value: string, status: string, unit: string }) {
    return (
        <div className="flex flex-col justify-start gap-2">
            <label htmlFor={`${signal}_${status}`} className="text-sm text-gray-500/70">{name} ( {unit} )</label>
            <input className="text-black dark:text-white" name={`${signal}_${status}`} value={value} onChange={() => { }} />
        </div>
    )
}