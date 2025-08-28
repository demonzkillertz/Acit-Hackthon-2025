import React from 'react';
import { TouchableOpacity, Linking, Platform, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ExternalLink({ href, children, style, ...rest }: ExternalLinkProps) {
  const handlePress = async (e: GestureResponderEvent) => {
    e.preventDefault();
    if (Platform.OS === 'web') {
      window.open(href, '_blank');
    } else {
      await Linking.openURL(href);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style} {...rest}>
      {typeof children === 'string' ? <Text style={{ color: '#1B95E0' }}>{children}</Text> : children}
    </TouchableOpacity>
  );
}
