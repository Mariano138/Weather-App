const getDateNumber = (dt: number) => {
  const date = new Date(dt * 1000);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
  });
};

export default getDateNumber;
