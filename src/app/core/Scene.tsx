import React, {Component} from 'react'
import {IPositioned} from '../utils/IPositioned'
import {IDimensioned} from '../utils/IDimensioned'

interface ISceneProps extends IPositioned, IDimensioned {

	children: any

	ready(scene: Scene): void

}

interface ISceneState {

}

export default class Scene extends Component<ISceneProps, ISceneState> {

	public update(timeStep: number): void {
		React.Children.forEach(this.props.children, layer => layer.ref.current.update(timeStep))
	}

	public drawLayers() {
		React.Children.forEach(this.props.children, layer => layer.ref.current.draw())
	}

	public componentDidMount(): void {
		this.props.ready(this)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div style={{position: 'relative', width: this.props.dimensions.w, height: this.props.dimensions.h, left: this.props.position.x, top: this.props.position.y, boxShadow: '4px 4px 5px 0px rgba(0, 0, 0, 0.75)'}}>
				{this.props.children}
			</div>
		)
	}

}