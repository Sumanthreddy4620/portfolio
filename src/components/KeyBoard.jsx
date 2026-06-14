import React, { forwardRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const KeyBoard = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('/models/mechanical_keyboard.glb')

    const keyMaterial = useMemo(() => {
        const mat = materials.material.clone()
        mat.color = new THREE.Color('#ffffff')
        mat.emissive = new THREE.Color('#ffffff')
        mat.emissiveIntensity = 0.8
        return mat
    }, [materials.material])

    return (
        <group ref={ref} {...props} dispose={null}>
            <group position={[0, 1.619, -0.017]} rotation={[0.123, 0, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.keyboard_Keyboard_0.geometry} material={materials.Keyboard} />
                <mesh castShadow receiveShadow geometry={nodes.keyboard_Key_0.geometry} material={keyMaterial} />
            </group>
            <mesh castShadow receiveShadow geometry={nodes.keys_Key_0.geometry} material={keyMaterial} position={[-15.094, 1.498, 2.822]} rotation={[0.123, 0, 0]} />
            <mesh castShadow receiveShadow geometry={nodes.legs_Keyboard_0.geometry} material={materials.Keyboard} position={[0, 0.921, -4.98]} rotation={[2.487, 0, 0]} />
            <mesh castShadow receiveShadow geometry={nodes.wire_Keyboard_0.geometry} material={materials.Keyboard} position={[0.008, 2.05, -6.444]} rotation={[0.123, 0, 0]} />
            <mesh castShadow receiveShadow geometry={nodes.usb_Keyboard_0.geometry} material={materials.Keyboard} position={[-3.918, 0.363, -46.929]} rotation={[-0.024, 0, 0]} />
            <mesh castShadow receiveShadow geometry={nodes.emissive_Key_0.geometry} material={keyMaterial} position={[-15.094, 1.671, 2.843]} rotation={[0.123, 0, 0]} />
        </group>
    )
})

useGLTF.preload('/models/mechanical_keyboard.glb')
export default KeyBoard;