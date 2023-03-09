import { Checkbox, Flex, List, ListItem, Tag, Text, Tooltip, useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { Displayable, SimpleDisplayable } from "~/typings";

const DescriptiveText = ({ title }: { title: SimpleDisplayable }) => {
  const [preventTooltipClose, setPreventTooltipClose] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: tooltipRef,
    handler: () => setPreventTooltipClose(false),
  });

  return (
    <Tooltip
      ref={tooltipRef}
      label={title}
      placement="right"
      hasArrow
      isOpen={preventTooltipClose ? true : undefined}
      pointerEvents="all"
    >
      <Text
        noOfLines={1}
        onClick={() => {
          !preventTooltipClose && setPreventTooltipClose(true);
        }}
      >
        {title}
      </Text>
    </Tooltip>
  );
};

export default ({ name, value }: { name: string; value?: Displayable }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      fontSize="xs"
      overflow="hidden"
      wordBreak="break-all"
    >
      <Text flexShrink={0}>{name}</Text>

      <Flex textAlign="right">
        {value === undefined || value === null ? null : Array.isArray(value) ? (
          <List>
            {value.map((item, i) => (
              <ListItem key={i}>
                {typeof item === "object" ? (
                  <Flex gap={2}>
                    <Text>{item.key}</Text>
                    :
                    <DescriptiveText title={item.val} />
                  </Flex>
                ) : (
                  <Tag>
                    <DescriptiveText title={item} />
                  </Tag>
                )}
              </ListItem>
            ))}
          </List>
        ) : typeof value === "boolean" ? (
          <Checkbox disabled isChecked={value} />
        ) : (
          <DescriptiveText title={value} />
        )}
      </Flex>
    </Flex>
  );
};
