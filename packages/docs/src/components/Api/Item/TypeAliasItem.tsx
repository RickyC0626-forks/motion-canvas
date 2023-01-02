import React from 'react';

import {useApiLookup} from '@site/src/contexts/api';
import CodeBlock from '@site/src/components/Api/Code/CodeBlock';
import Container from '@site/src/components/Api/Code/Container';
import Line from '@site/src/components/Api/Code/Line';
import Preview from '@site/src/components/Api/Preview';
import Item from '@site/src/components/Api/Item';
import Heading from '@theme/Heading';
import Comment from '@site/src/components/Api/Comment';
import TypeParameters from '@site/src/components/Api/TypeParameters';
import Signatures from '@site/src/components/Api/Signatures';
import type {JSONOutput} from 'typedoc';

export default function TypeAliasItem({
  reflection,
}: {
  reflection: JSONOutput.DeclarationReflection;
}) {
  const lookup = useApiLookup();

  return (
    <>
      <Heading as="h3" id={reflection.anchor}>
        <code>{reflection.name}</code>
      </Heading>
      <Container>
        <CodeBlock link={reflection.sources?.[0]?.url}>
          <Line>
            <Preview reflection={reflection} />
          </Line>
        </CodeBlock>
      </Container>
      <Comment comment={reflection.comment} />
      <TypeParameters parameters={reflection.typeParameters}></TypeParameters>
      {reflection.signatures && (
        <>
          <h2>Callable</h2>
          <Signatures signatures={reflection.signatures} />
        </>
      )}
      {reflection.groups?.map(group => (
        <React.Fragment key={group.title}>
          <h2>{group.title}</h2>
          {group.children
            .map(child => lookup[child])
            .filter(
              child =>
                child &&
                (child.flags.isPublic ||
                  (!child.flags.isProtected && !child.flags.isPrivate)),
            )
            .map(child => (
              <Item key={child.id} reflection={child} />
            ))}
        </React.Fragment>
      ))}
    </>
  );
}
