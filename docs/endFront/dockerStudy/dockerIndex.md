---
outline: deep
---

# Docker开发学习文档

什么是Docker？

K8S是基于容器的集群管理平台，它的全称，是kubernetes，是一个开源的容器编排引擎，用来对容器化应用进行自动化部署、扩缩和管理。Docker 是一个容器化平台，而 k8s 是 Docker 等容器平台的协调器。
概述:
[Docker官网](https://kubernetes.io/docs/home/)
```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
