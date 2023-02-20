export default function format(d: Date){
    return d.toString().replace(/\w+ (\w+) (\d+) (\d+).*/, "$2 $1 $3");
}