import React from "react";
import { Image, Buffer, ShaderToy } from "shadertoy-react";

const FluidSimulation = () => {
  // 将 common.glsl 内容注入所有 Shader
  const commonShaderCode = `
    // 此处粘贴 common.glsl 的全部内容
    ${require('!raw-loader!./shadersb/common.glsl')}
  `;

  return (
    <ShaderToy>
      {/* 缓冲区A：粒子初始化与重新整合 */}
      <Buffer
        id="bufferA"
        code={`
          ${commonShaderCode}
          ${require('!raw-loader!./shadersb/bufferA.glsl')}
        `}
      />

      {/* 缓冲区B：物理模拟与粒子喷射 */}
      <Buffer
        id="bufferB"
        code={`
          ${commonShaderCode}
          ${require('!raw-loader!./shadersb/bufferB.glsl')}
        `}
        iChannel0={{ buffer: "bufferA" }} // 读取 bufferA 的输出
      />

      {/* 缓冲区C：密度计算 */}
      <Buffer
        id="bufferC"
        code={`
          ${commonShaderCode}
          ${require('!raw-loader!./shadersb/bufferC.glsl')}
        `}
        iChannel0={{ buffer: "bufferB" }} // 读取 bufferB 的输出
      />

      {/* 主图像渲染 */}
      <Image
        code={`
          ${commonShaderCode}
          ${require('!raw-loader!./shadersb/image.glsl')}
        `}
        iChannel0={{ buffer: "bufferC" }} // 读取 bufferC 的密度数据
        iChannel1={{ buffer: "bufferB" }} // 可选：需要额外通道时添加
      />
    </ShaderToy>
  );
};

export default FluidSimulation;