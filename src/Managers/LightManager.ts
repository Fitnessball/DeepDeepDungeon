import 'phaser'
class LightManager {
    private scene: Phaser.Scene;
    private lights: Phaser.GameObjects.Light[];
  
    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.lights = [];
    }
    
    public addLight(x: number, y: number, color: number, radius: number, intensity: number): Phaser.GameObjects.Light {
      const light = this.scene.lights.addLight(x, y, radius,color, intensity);
      this.lights.push(light);
      return light;
    }
  
    public removeLight(light: Phaser.GameObjects.Light): void {
        const index = this.lights.indexOf(light);
        if (index > -1) {
          this.lights.splice(index, 1);
          this.scene.lights.removeLight(light);
        }
    }
    public setLightVisible(light: Phaser.GameObjects.Light,on:boolean): void{
      light.setVisible(on)
    }
    public update(): void {
    }
     public reduceLightRadius(light: Phaser.GameObjects.Light, amount: number, deltaTime: number, step: number = 1): void {
         const reduction = amount
         const newRadius = light.radius - reduction;
         light.radius = Phaser.Math.Clamp(newRadius, 0, light.radius - step);
       }
       public increaseLightRadius(light: Phaser.GameObjects.Light, amount: number, step: number = 1): void {
        const increase = amount;
        light.radius = Phaser.Math.Clamp(increase, 0, light.radius + step);
      }
       public reduceAllLightRadius(amount: number, deltaTime: number, step: number = 1): void {
        for (const light of this.lights) {
        const reduction = amount
        const newRadius = light.radius - reduction;
        light.radius = Phaser.Math.Clamp(newRadius, 0, light.radius - step);
        }
      }
    public setLightRadius(light:Phaser.GameObjects.Light,radius:number){
        light.setRadius(radius);
    }
    // Other methods for managing lights...
    public updateLightPosition(light: Phaser.GameObjects.Light, x: number, y: number): void {
        light.x = x;
        light.y = y;
      }
    // Example: Turn on/off all lights
    public toggleAllLights(on: boolean): void {
      for (const light of this.lights) {
        light.setVisible(on);
      }
    }
  }
  
  export default LightManager;