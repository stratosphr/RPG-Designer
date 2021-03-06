import Scene from '../Scene'

export default class Game {

	public static run(scene: Scene, fps: number = 60) {
		window.requestAnimationFrame((timestamp) => Game.loop(scene, 1000 / fps, timestamp, 0, 0))
	}

	private static loop(scene: Scene, timeStep: number, timestamp: number, delta: number, lastFrameTimeMs: number) {
		delta += timestamp - lastFrameTimeMs
		lastFrameTimeMs = timestamp
		let numUpdateSteps = 0
		while (delta >= timeStep) {
			scene.update(timeStep)
			delta -= timeStep
			if (++numUpdateSteps >= 200) {
				Game.panic(timeStep)
				break
			}
		}
		scene.drawLayers()
		window.requestAnimationFrame((timestamp) => this.loop(scene, timeStep, timestamp, delta, lastFrameTimeMs))
	}

	private static panic(timeStep: number) {
		console.error('The applyToNode process is too slow to render the game at expected refresh rate (' + Math.round(1000 / timeStep) + ' frames per second)')
	}

}