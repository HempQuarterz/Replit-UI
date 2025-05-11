import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SimpleHempModelProps {
  className?: string;
}

const SimpleHempModel: React.FC<SimpleHempModelProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x052e16); // Dark green background
    
    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a simple 3D plant model (simplified representation)
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x22c55e });
    const stem = new THREE.Mesh(geometry, material);
    stem.position.y = -0.5;
    scene.add(stem);
    
    // Create leaves
    const leafGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x15803d });
    
    for (let i = 0; i < 6; i++) {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.y = i * 0.3 - 0.5;
      leaf.rotation.x = Math.PI / 2;
      leaf.rotation.z = i * Math.PI / 3;
      leaf.scale.set(0.3, 0.3, 0.3);
      stem.add(leaf);
    }
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animation loop
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      stem.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={containerRef} className={`w-full h-full ${className}`}></div>;
};

export default SimpleHempModel;