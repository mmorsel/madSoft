import { Chip, Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { useFormStore } from "../store/useFormStore";

const initTime = new Date();
initTime.setSeconds(initTime.getSeconds() + 0);

const TIME_DURATION = 900;

const Timer: React.FC = memo(() => {
  const { expiryTimestamp, timeIsOut, setTimer } = useFormStore((store) => ({
    expiryTimestamp: store.timer?.value ?? 0,
    timeIsOut: store.timer?.timeIsOut,
    setTimer: store.setTimer,
  }));

  const { seconds, minutes, hours, pause, restart } = useTimer({
    expiryTimestamp: initTime,
    onExpire: () => {
      setTimer({ timeIsOut: true });
    },
    autoStart: false,
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(
      time.getSeconds() +
        (expiryTimestamp === 0 ? TIME_DURATION : expiryTimestamp ?? 0)
    );

    restart(time, true);
    setTimer({ value: expiryTimestamp });

    const interval = setInterval(() => {
      setTimer({
        value: (expiryTimestamp <= 0 ? TIME_DURATION : expiryTimestamp) - 1,
      });
    }, 1000);

    return () => {
      pause();
      clearInterval(interval);
    };
  }, [expiryTimestamp, pause, restart, setTimer]);

  return (
    <>
      <Chip
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          backgroundColor: (theme) =>
            timeIsOut ? theme.palette.error.light : "transparent",
          border: (theme) => `1px solid ${theme.palette.common.black}`,
          width: 140,
        }}
        label={
          <Typography
            component="span"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
          >
            {`${hours} : ${minutes} : ${seconds}`}
          </Typography>
        }
      />
      {timeIsOut && <Typography color="error">Время вышло</Typography>}
    </>
  );
});

export default Timer;
