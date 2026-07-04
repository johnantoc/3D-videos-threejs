export function SquareSphere({
    backlight = true,
    backlightColor = "#00ffff",
}: {
    backlight: boolean;
    backlightColor: string;
}) {

    return (
        <>
            <pointLight name="keyLight" position={[2, 0, 2]} />
            <pointLight name={"fillLight"} position={[2, 0, -2]} />
            {backlight && <pointLight name={"backLight"} color={backlightColor} position={[-3, 2, 0]} />}
            <mesh position={0}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <sphereGeometry />
                <meshStandardMaterial />
            </mesh>
            <pointsMaterial
                color="#00f0ff"
                size={0.06}
                sizeAttenuation
                transparent
                opacity={0.5}
                depthWrite={false}
            />
        </>
    )
}