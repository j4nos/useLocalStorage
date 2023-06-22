import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

export default function useLocalStorage<T>(
	key: string,
	fallbackValue: T
): [T, SetValue<T>, Boolean] {
	const [value, setValue] = useState<T>(fallbackValue)
	const [isInitialized, setIsInitialized] = useState<Boolean>(false)

	useEffect(() => {
		if (
			typeof localStorage !== 'undefined' &&
			(value || value == '') &&
			isInitialized
		) {
			localStorage.setItem(key, JSON.stringify(value))
		}
	}, [value])

	useEffect(() => {
		const stored = localStorage.getItem(key)
		if (stored) {
			setValue(JSON.parse(stored))
		}
		setIsInitialized(true)
	}, [])

	return [value, setValue, isInitialized]
}
