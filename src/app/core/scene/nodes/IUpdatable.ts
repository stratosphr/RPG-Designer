import Layer from '../Layer'

export interface IUpdatable {

	update(layer: Layer, timeStep: number): void

}

