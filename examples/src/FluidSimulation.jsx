import React from "react";
// import { Image, Buffer, ShaderToy } from "shadertoy-react";
import ShadertoyReact from "../../src/index.jsx";
import commonShaderCode from './shadersb/common.glsl'; // Direct import
import bufferACode from './shadersb/bufferA.glsl';
import bufferBCode from './shadersb/bufferB.glsl';
import bufferCCode from './shadersb/bufferC.glsl';
import imageShaderCode from './shadersb/image.glsl';

const FluidSimulation = () => {
  return (
    <ShaderToy>
      {/* 缓冲区A：粒子初始化与重新整合 */}
      <Buffer
        id="bufferA"
        code={`
          ${commonShaderCode}
          ${bufferACode}
        `}
      />

      {/* 缓冲区B：物理模拟与粒子喷射 */}
      <Buffer
        id="bufferB"
        code={`
          ${commonShaderCode}
          ${bufferBCode}
        `}
        iChannel0={{ buffer: "bufferA" }} // 读取 bufferA 的输出
      />

      {/* 缓冲区C：密度计算 */}
      <Buffer
        id="bufferC"
        code={`
          ${commonShaderCode}
          ${bufferCCode}
        `}
        iChannel0={{ buffer: "bufferB" }} // 读取 bufferB 的输出
      />

      {/* 主图像渲染 */}
      <Image
        code={`
          ${commonShaderCode}
          ${imageShaderCode}
        `}
        iChannel0={{ buffer: "bufferC" }} // 读取 bufferC 的密度数据
        iChannel1={{ buffer: "bufferB" }} // 可选：需要额外通道时添加
      />
    </ShaderToy>
  );
};

export default FluidSimulation;
