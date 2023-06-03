import { EventEmitter } from "events"

const event = new EventEmitter()

event.addListener("event1", () => {
  console.log("event1 listener triggered")
})

event.on("event2", () => {
  console.log("event2 listener triggered - 1")
})
event.on("event2", () => {
  console.log("event2 listener triggered - 2")
})

event.once("event3", () => {
  // this event listener will be triggered once
  console.log("event3 listener triggered")
})

event.emit("event1")
event.emit("event2")
event.emit("event3")
event.emit("event3")

event.on("event4", () => {
  console.log("event4 listener triggered")
})
event.removeAllListeners("event4")
event.emit("event4")

const listener = () => {
  console.log("event5 listener triggered")
}
event.on("event5", listener)
event.removeListener("event5", listener)
event.emit("event5")

console.log(event.listenerCount("event2"))
