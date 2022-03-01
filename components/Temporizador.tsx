import styles from '../styles/Temporizador.module.css'
import {CountdownCircleTimer, useCountdown} from 'react-countdown-circle-timer'

interface TemporizadorProps {
    key: any
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps){

    const { remainingTime } = useCountdown({ isPlaying: true, duration: 120, colors: 'red' })

    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                duration={props.duracao}
                size={120}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={[
                    '#BCE596',
                    '#F7B801',
                    '#ED827A'
                ]}
                colorsTime={[0,40,80]}
            >
                {({remainingTime}) => remainingTime}
            </CountdownCircleTimer>
            </div>
    )
}