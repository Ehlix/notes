import { Link } from '@/common/components/ui/Link';
import { nestedRouts } from '@/common/static/nestedRouts';
import { ctx } from '@/main';
import { getCurrentPath } from '@/router';
import { h, VNode } from 'snabbdom';

export const Related = (): VNode | null => {
  const currentPath = getCurrentPath(ctx);
  const tp = currentPath.split('/');
  tp.length = 3;
  const topPath = tp.join('/');
  const relatedNodes: VNode[] = [];

  const getNodes = (items: RoutItem[]) => {
    items.forEach((item) => {
      if (item.link !== currentPath) {
        relatedNodes.push(
          h('li', Link({ href: item.link, title: item.title }))
        );
      }
      if (item.subData.length) {
        getNodes(item.subData);
      }
    });
  };

  const targetRouts = nestedRouts.find((item) => item.link.startsWith(topPath));

  if (targetRouts) {
    if (targetRouts.link !== currentPath) {
      relatedNodes.push(
        h('li', Link({ href: targetRouts.link, title: targetRouts.title }))
      );
    }
    getNodes(targetRouts.subData);
  }

  return relatedNodes.length ? h('ul', relatedNodes) : null;
};
