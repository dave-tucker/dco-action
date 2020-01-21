const dcoRegex : RegExp = RegExp(/^Signed-off-by: ([^<]+) <([^<>@]+@[^<>]+)>$/, 'gm');
const dockerDcoRegex : RegExp = RegExp(/^Docker-DCO-1\.1-Signed-off-by: ([^<]+) <([^<>@]+@[^<>]+)>( \(github: ([a-zA-Z0-9][a-zA-Z0-9-]+)\))?$/, 'gm');
export function checkSignOff(message : string) : boolean {
  return dcoRegex.test(message) || dockerDcoRegex.test(message);
}