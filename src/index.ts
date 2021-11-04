import net from "net";

interface FindPortOptions {
  max: number;
}

const SUCCESS_EVENTS = ["error"];
const FAILURE_EVENTS = ["connect", "timeout"];

/**
 * Probes a port, returns whether or not it is open.
 * @param port The port to probe.
 * @param timeout The amount of time to wait before timing out.
 * @returns Whether or not the port is open..
 */
export const probe = (
  port: number,
  timeout: number = 5000
): Promise<boolean> => {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, timeout });

    const complete = (success: boolean) => {
      socket.end();
      socket.removeAllListeners();
      resolve(success);
    };

    SUCCESS_EVENTS.forEach((eventName) =>
      socket.once(eventName, () => complete(true))
    );

    FAILURE_EVENTS.forEach((eventName) =>
      socket.once(eventName, () => complete(false))
    );
  });
};

/**
 * Finds an port in a range of ports.
 * @param port The port to begin with.
 * @param options The options for the scan.
 * @returns Resolves to the acquired port, if it exists, otherwise null.
 */
export const findPort = async (
  startingPort: number,
  options: FindPortOptions
): Promise<number | null> => {
  const { max = startingPort + 1000 } = (options || {}) as FindPortOptions;
  if (max <= startingPort)
    throw Error("Maximum port cannot be less than or equal to starting port.");

  for (let port = startingPort; port <= max; port++) {
    const success = await probe(port);
    if (success) return port;
  }

  return null;
};
