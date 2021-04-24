import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import styles from './home.module.scss';

export default function Home() {

  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('June 24, 2021 00:00:00').getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop our timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000)
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./devs.json')
    })
  }, [])

  return (
    <>
      <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="logo tomacred"/>
      </header>
      
      <section className={styles.timer}>
          <span>🚀 Novidades em breve!</span>
        <div className={styles.countdown}>
          <section>
            <p>{timerDays}</p>
            <p>
              <small>Dias</small>
            </p>
          </section>
          <span>:</span>

          <section>
            <p>{timerHours}</p>
            <p>
              <small>Horas</small>
            </p>
          </section>
          <span>:</span>

          <section>
            <p>{timerMinutes}</p>
            <p>
              <small>Minutos</small>
            </p>
          </section>
          <span>:</span>

          <section>
            <p>{timerSeconds}</p>
            <p>
              <small>Segundos</small>
            </p>
          </section>

        </div>    

        <div className="container" ref={container} />

        <div className={styles.btnWhatsapp}>
          <a href="https://api.whatsapp.com/send?phone=5511942267400&text=Gostaria%20de%20informações%20sobre%20a%20Tomacred.">
            <img src="/whatsapp.svg" alt="Whatsapp" />
                Saiba mais
          </a>
        </div>

        <footer className={styles.footer}>Copyright © 2021 TOMA CRED. Todos os direitos reservados.</footer>

      </section>

    </>
  )
}
